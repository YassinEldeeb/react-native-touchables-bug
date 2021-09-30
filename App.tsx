import React, { memo, useState } from 'react'
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

const DotsNum = 4
const DotWidth = 18
const PadSpacing = 13
const NumberWidth = width / 4 - PadSpacing / 2
const Pads = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, 'delete']
const dotsArray = new Array(DotsNum).fill(0)

export default () => {
  const [PINCode, setPINCode] = useState('')

  const NumberRenderItem = memo(
    ({ item, index }: ListRenderItemInfo<string | number>) => {
      if (item === -1) {
        return (
          <View
            style={[styles.emptyNumber, index % 3 !== 0 && styles.paddingLeft]}
          />
        )
      }

      return (
        <TouchableHighlight
          underlayColor='#181818'
          onPress={() => {
            if (item !== 'delete') {
              return setPINCode(PINCode + item)
            }
            const editedPINCode = PINCode.slice(0, -1)
            setPINCode(editedPINCode)
          }}
          style={[styles.number, index % 3 !== 0 && styles.paddingLeft]}
        >
          <Text
            style={[
              styles.text,
              {
                fontSize: 30,
              },
            ]}
          >
            {item}
          </Text>
        </TouchableHighlight>
      )
    }
  )

  const Dots = memo(() => {
    return (
      <View style={styles.dots}>
        {dotsArray.map((e, i) => (
          <View key={`Dot:${i}`} style={[styles.dot]}>
            {i + 1 <= PINCode.length && <View style={[styles.active]} />}
          </View>
        ))}
      </View>
    )
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0F0F' }}>
      <View style={styles.parent}>
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.text, styles.title]}>Enter PIN Code</Text>
          <Dots />
        </View>
        <View style={{ height: NumberWidth * 4 + PadSpacing * 3 }}>
          <FlatList
            style={{
              width: '100%',
            }}
            contentContainerStyle={styles.numbers}
            numColumns={3}
            data={Pads}
            keyExtractor={(item) => item.toString()}
            renderItem={(props) => <NumberRenderItem {...props} />}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  parent: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    marginHorizontal: NumberWidth / 2,
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    marginBottom: 36,
  },
  dots: {
    flexDirection: 'row',
    width: (DotsNum + 0.8) * DotWidth,
    justifyContent: 'space-between',
  },
  dot: {
    width: DotWidth,
    height: DotWidth,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: DotWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: 'white',
    width: DotWidth + 2,
    height: DotWidth + 2,
    borderRadius: 100,
    borderWidth: 2,
  },
  numbers: {
    width: '100%',
    height: NumberWidth * 4 + PadSpacing * 3,
  },
  number: {
    width: NumberWidth,
    height: NumberWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: NumberWidth / 2,
    marginBottom: PadSpacing / 2,
  },
  emptyNumber: {
    width: NumberWidth,
    height: NumberWidth,
    marginBottom: PadSpacing / 2,
  },
  paddingLeft: {
    marginLeft: PadSpacing,
  },
  text: {
    color: '#FFFFFF',
  },
})
