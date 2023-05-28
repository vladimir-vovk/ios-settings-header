import { ReactElement, useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { animation, colors } from 'src/constants'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(247, 248, 247)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomColor: colors.bg,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginTop: 5,
    marginBottom: 11,
    opacity: 0
  }
})

type Props = {
  title: string
  scrollY: Animated.Value
  isTitleVisible: boolean
}

export const Header = ({ title, scrollY, isTitleVisible }: Props): ReactElement => {
  const opacity = useRef(new Animated.Value(0)).current
  const { top } = useSafeAreaInsets()

  const backgroundColor = scrollY.interpolate({
    inputRange: [animation.header.startY, animation.header.endY],
    outputRange: [colors.bg, 'rgb(250, 250, 252)'],
    extrapolate: 'clamp'
  })
  const borderBottomColor = scrollY.interpolate({
    inputRange: [animation.header.startY, animation.header.endY],
    outputRange: [colors.bg, 'rgb(218, 218, 221)'],
    extrapolate: 'clamp'
  })

  const showTitle = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: animation.title.duration,
      useNativeDriver: true
    }).start()
  }

  const hideTitle = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: animation.title.duration,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    if (isTitleVisible) {
      showTitle()
    } else {
      hideTitle()
    }
  }, [isTitleVisible])

  return (
    <Animated.View
      style={[styles.container, { paddingTop: top, backgroundColor, borderBottomColor }]}
    >
      <Animated.Text style={[styles.title, { opacity }]}>{title}</Animated.Text>
    </Animated.View>
  )
}
