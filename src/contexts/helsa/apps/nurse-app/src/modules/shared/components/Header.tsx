import capitalize from 'capitalize';
import { StyleSheet, Text, View } from "react-native";

export function Header(props: any) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{capitalize(props.route.name)}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#110f14",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 100,
    marginTop: 20,
    marginBottom: 20,
    gap: 20,
  },
  title: {
    fontSize: 30,
    marginLeft: 20,
    color: "#fff",
    fontFamily: "Nunito_600SemiBold",
    fontWeight: "normal"
  },
});
