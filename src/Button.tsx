import { ReactElement } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { images } from 'src/constants'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 11
  },
  highlighted: {
    backgroundColor: 'rgb(226, 226, 227)'
  },
  borderWrapper: {
    borderBottomColor: 'rgb(241, 241, 241)',
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  borderPressed: {
    borderBottomColor: 'rgb(226, 226, 227)'
  },
  label: {
    fontSize: 17,
    fontWeight: '400'
  },
  chevron: {
    width: 7,
    height: 12
  }
})

type Props = {
  label: string
  mt?: number
  mb?: number
  type?: 'default' | 'top' | 'bottom' | 'between'
}

export const Button = ({ label, mt, mb, type = 'default' }: Props): ReactElement => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        !!mt && { marginTop: mt },
        !!mb && { marginBottom: mb },
        (type === 'top' || type === 'between') && {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0
        },
        (type === 'bottom' || type === 'between') && {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0
        },
        pressed && styles.highlighted
      ]}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.borderWrapper,
            (type === 'default' || type === 'bottom') && { borderBottomWidth: 0 },
            pressed && styles.borderPressed
          ]}
        >
          <Text style={styles.label}>{label}</Text>
          <Image style={styles.chevron} source={images.chevronRight} />
        </View>
      )}
    </Pressable>
  )
}
