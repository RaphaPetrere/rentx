import { useNetInfo } from '@react-native-community/netinfo'
import React, { useEffect, useState } from 'react'
import { Car as CarModel } from '../../database/model/Car'
import api from '../../services/api'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'
import { Acessory } from '../Acessory'
import {
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  About,
} from './styles'

interface Props {
  car: CarModel,
  showAbout?: boolean,
}

interface Accessories {
  id: string;
  type: string;
  name: string;
}[]

export function CarInfo({car, showAbout = false}: Props) {
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const netinfo = useNetInfo();
  useEffect(() => {
    async function loadCarAccessories() {
      const response = await api.get(`cars/${car.id}`);
      setAccessories(response.data.accessories);
    }

    netinfo.isConnected && loadCarAccessories();
  }, [netinfo.isConnected]);
  return (
    <>
      <Details>
        <Description>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
        </Description>

        <Rent>
          <Period>{car.period}</Period>
          <Price>R$ {netinfo.isConnected ? car.price : '...'}</Price>
        </Rent>
      </Details>

      {
        accessories.length > 0 ?
        <Accessories>
          {
            accessories.map(accessory => 
              <Acessory 
                key={accessory.id}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type == 'exchange' ? 'gearbox' : accessory.type)}
              />
            )
          }
        </Accessories>
        :
        <>
        </>
      }
      {
        showAbout &&
          <About>{car.about}</About>
      }
    </>
  )
}