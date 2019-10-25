import React from 'react'
import { View, Text, Image, ImageSourcePropType } from 'react-native'
import { shape, string, number } from 'prop-types'
import styles from './Card.styles'

const Card = ({ card }) => (
  <View
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={card.photo}
      resizeMode="contain"
    />
    <View style={styles.photoDescriptionContainer}>
    <Text style={{color:'rgba(0,0,0,0)'}}>{`${card.summary}`}</Text>
      <Text style={styles.text}>
        {`${card.name}`}
      </Text>
    </View>
  </View>
)

Card.propTypes = {
  card: shape({
    photo: ImageSourcePropType,
    name: string,
    rating: number,
  }).isRequired,
}

export default Card
