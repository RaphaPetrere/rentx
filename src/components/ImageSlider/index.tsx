import React, { useRef, useState, useEffect } from 'react'
import { useNetInfo } from '@react-native-community/netinfo';
import { FlatList, ViewToken } from 'react-native'
import { Car as CarModel } from '../../database/model/Car';
import api from '../../services/api';
import { Bullet } from '../Bullet';
import {
  Container,
  ImageIndexes,
  CarImageWrapper,
  CarImage,
} from './styles'

interface Props {
  car: CarModel
}

interface ImagesProps {
  id: string;
  photo: string;
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}

export function ImageSlider({ car }: Props) {
  const [images, setImages] = useState<ImagesProps[]>([{ id: car.id, photo: car.thumbnail }])
  const [imageIndex, setImageIndex] = useState(0);
  const netinfo = useNetInfo();
  const indexChanged = useRef((info: ChangeImageProps) => 
    setImageIndex(info.viewableItems[0].index!)
  );

  useEffect(() => {
    async function fetchImages() {
      const response = await api.get(`cars/${car.id}`);
      setImages(response.data.photos);
    }

    netinfo.isConnected && fetchImages();
  }, [netinfo.isConnected]);
  return (
    <Container>
      <ImageIndexes>
        {
          images.map((item, index) =>
            <Bullet 
              key={String(item.id)}
              active={imageIndex == index}
            />
          )
        }
      </ImageIndexes>

      <FlatList 
        data={images}
        keyExtractor={item => item.id}
        renderItem={({ item }) => 
          <CarImageWrapper>
            <CarImage 
              source={{ uri: item.photo }}
              resizeMode='contain'
            />
          </CarImageWrapper>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
      />
    </Container>
  )
}