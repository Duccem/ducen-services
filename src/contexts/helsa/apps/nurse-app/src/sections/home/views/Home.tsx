import { StyleSheet, Text, View } from "react-native";
export function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 20,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
