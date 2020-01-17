import { StyleSheet } from 'react-native'

// #605C9A

const styles = StyleSheet.create({

    center: {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    stat_digit_text: {
        fontSize: 13,
        color: '#474747',
        fontWeight: '300'

    },

    stat_title_text: {
        fontSize: 8,
        color: '#474747',
        fontWeight: '600',
        marginTop: 4

    },

    space_evenly: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    row: {
        flexDirection: 'row'
    },

    column_center: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    row_end: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    char_validation: {
        fontSize: 11,
        color: '#474747',
        marginBottom: 10
    },

    error: {
        fontSize: 11,
        color: '#F55E5E',
        marginBottom: 10
    },

    interview: {
        backgroundColor: '#474747'
    },

    stat_border: {
        borderWidth: .5,
        borderRadius: 5,
        borderColor: '#474747',
        padding: 5
    },

    stat_graphics: {
        width: 22.5,
        height: 22.5,
        marginTop: 9
    }

})

export default styles;