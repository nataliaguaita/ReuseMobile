import { View, Text, StyleSheet } from 'react-native';

const Profile = () => (
<View style={styles.container}>
    <Text>Chat</Text>
</View>
);

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Profile;