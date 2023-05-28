import { ReactElement, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { animation } from 'src/constants'
import { Header } from 'src/Header'
import { Scroll } from 'src/Scroll'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(242, 242, 245)'
  }
})

export default function App(): ReactElement {
  const scrollY = useRef(new Animated.Value(0)).current
  const [isTitleVisible, setTitleVisible] = useState(false)
  const { title } = animation

  const onScroll = (y: number) => {
    if (y >= title.startY && !isTitleVisible) {
      setTitleVisible(true)
    } else if (y < title.startY && isTitleVisible) {
      setTitleVisible(false)
    }
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header title="Settings" scrollY={scrollY} isTitleVisible={isTitleVisible} />
        <Scroll scrollY={scrollY} onScroll={onScroll} />
      </View>
    </SafeAreaProvider>
  )
}
