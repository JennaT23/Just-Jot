import { getAuth, deleteUser, updateEmail, updatePassword, updateProfile } from "firebase/auth"
import { Alert } from "react-native";

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

const UpdateEmail = ({ newEmail }) => {
    const auth = getAuth()
    const user = auth.currentUser;

    if (user) {
        updateEmail(user, newEmail)
            .then(() => {
                console.log('Email updated successfully.')
                Alert.alert('Email updated successfully.')
            })
            .catch(() => {
                console.error('Error updating email:', error.message);
                Alert.alert('Error updating email:', error.message);
            });
    } else {
        console.log('No user signed in.');
    }
}

const UpdatePassword = ({ newPassword }) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        updatePassword(user, newPassword)
            .then(() => {
                console.log('Password updated successfully.')
                Alert.alert('Password updated successfully.')
            })
            .catch(() => {
                console.error('Error updating password:', error.message);
                Alert.alert('Error updating password:', error.message);
            });
    } else {
        console.log('No user signed in.');
    }
}

const UpdateUsername = ({ newUsername }) => {
    auth = getAuth();
    user = auth.currentUser;

    if (user) {
        updateProfile(user, { displayName: newUsername })
            .then(() => {
                console.log("Username updated successfully.");
                Alert.alert("Username updated successfully.");
            })
            .catch(() => {
                console.error("Error updating username:", error);
                Alert.alert("Error updating username:", error);
            })
    } else {
        console.log("No user signed in.");
    }
}