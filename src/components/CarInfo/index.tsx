import React from 'react'
import { CarDTO } from '../../dtos/CarDTO'
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
  car: CarDTO,
  showAbout?: boolean,
}

export function CarInfo({car, showAbout = false}: Props) {
  return (
    <>
      <Details>
        <Description>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
        </Description>

        <Rent>
          <Period>{car.period}</Period>
          <Price>R$ {car.price}</Price>
        </Rent>
      </Details>

      <Accessories>
        {
          car.accessories.map(accessory => 
            <Acessory 
              key={accessory.id}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type == 'exchange' ? 'gearbox' : accessory.type)}
            />
          )
        }
      </Accessories>
      {
        showAbout &&
          <About>{car.about}</About>
      }
    </>
  )
}