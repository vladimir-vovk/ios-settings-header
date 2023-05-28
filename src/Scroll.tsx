import { ReactElement } from 'react'
import { Animated, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text } from 'react-native'

import { Button } from 'src/Button'

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 21
  },
  title: {
    fontSize: 32,
    fontWeight: '700'
  }
})

type Props = {
  scrollY: Animated.Value
  onScroll: (y: number) => void
}

export const Scroll = ({ scrollY, onScroll }: Props): ReactElement => {
  return (
    <Animated.ScrollView
      contentContainerStyle={[styles.content]}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }
        ],
        {
          useNativeDriver: false,
          listener: (event: NativeSyntheticEvent<NativeScrollEvent>) =>
            onScroll?.(event?.nativeEvent.contentOffset?.y)
        }
      )}
    >
      <Text style={styles.title}>Settings</Text>

      <Button label="About this device" mt={14} type="top" />
      <Button label="Software update" type="bottom" />

      <Button label="AirDrop" mt={72} type="top" />
      <Button label="AirPlay & Handoff" type="between" />
      <Button label="Picture in picture" type="between" />
      <Button label="CarPlay" type="bottom" />

      <Button label={`«Home» button`} mt={72} />

      <Button label="Keyboard" mt={72} type="top" />
      <Button label="Game Controller" type="between" />
      <Button label="Fonts" type="between" />
      <Button label="Language & Region" type="between" />
      <Button label="Dictionary" type="bottom" />

      <Button label="Transfer or Reset iPhone" mt={72} mb={72} />
    </Animated.ScrollView>
  )
}
