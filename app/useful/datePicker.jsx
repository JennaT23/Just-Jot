import React, { useState } from 'react'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Platform, TouchableOpacity } from 'react-native';
import Text from '../../appStyles/customStyle'

export const PickDate = ({displayDate, sendDate}) => {

    // const initialDate = new Date(displayDate);
    // const [date, setDate] = useState(initialDate);
    const date = new Date();

    let minDate = new Date();
    minDate = moment(minDate).subtract(10, 'year');
    let maxDate = new Date();
    maxDate = moment(maxDate).add(5, 'year');
    console.log(minDate);

    const setChosenDate = ({type}, selectedDate) => {
        console.log("selectedDate: " + selectedDate);
        // if(type == 'set' || type == 'dismissed') {
        //     const currentDate = selectedDate;
        //     // setDate(currentDate);
        //     console.log(currentDate);
        // }
        // const currentDate = selectedDate;
        // // setDate(currentDate);
        // console.log(currentDate);


        // if(type == 'set' || type == 'dismissed')
        // {
        //     const currentDate = selectedDate;
        //     setDate(currentDate);

        //     // sendDate(currentDate);
        //     if(Platform.OS === "android") {
        //         sendDate(date);
        //     }
        // }
    }

    const funct = () => {
        console.log('fjkm,');
        sendDate('Wed Oct 19 2023');
    }

    return (
        <View>
            <Text>
                Hello {displayDate}
            </Text>
            <TouchableOpacity onPress={funct}>
                <Text>
                    press
                </Text>
            </TouchableOpacity>
            <DateTimePicker 
                mode='date'
                display='default'
                value={date}
                minimumDate={minDate}
                maximumDate={maxDate}
                onChange={setChosenDate}
            />
        </View>
    )
}

// export const PickDate = ({displayDate, sendDate}) => {
//     const initialDate = new Date(displayDate);
//     const [date, setDate] = useState(initialDate);

//     let minDate = new Date();
//     minDate = moment(minDate).subtract(10, 'year').format('YYYY-MM-DD');
//     let maxDate = new Date();
//     maxDate = moment(maxDate).add(5, 'year').format('YYYY-MM-DD');

//     const setChosenDate = ({ type }, selectedDate) => {
//         if(type == 'set' || type == 'dismissed')
//         {
//             const currentDate = selectedDate;
//             setDate(currentDate);

//             // sendDate(currentDate);
//             if(Platform.OS === "android") {
//                 sendDate(date);
//             }
//         }
//     }
//     const confirmIOSDate = () => {
//         sendDate(date);
//     }

//     return (
//         <View>
//             <DateTimePicker 
//                 mode='date'
//                 display='default'
//                 value={date}
//                 minimumDate={minDate}
//                 maximumDate={maxDate}
//                 onChange={setChosenDate}
//             />

//             { Platform.OS === "ios" && (
//                 <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
//                     <TouchableOpacity onPress={confirmIOSDate}>
//                         <Text>Cancel</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={confirmIOSDate}>
//                         <Text>Confirm</Text>
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </View>
//     )
// }