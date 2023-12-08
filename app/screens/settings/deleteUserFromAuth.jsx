import { getAuth, deleteUser } from "firebase/auth"

const DeleteUserFromAuth = async () => {
    console.log('Deleting')
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        deleteUser(user)
            .then(() => {
                console.log('Successfully deleted user');
                Alert.alert('Account successfully deleted')
                navigation.navigate('Login')
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    } else {
        console.log('No user signed in.');
    }
}