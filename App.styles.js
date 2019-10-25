import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get('window');
const Screen_height = Dimensions.get('window').height;
const Screen_width = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  swiperContainer: {
    marginTop: 4
  },
  buttonsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '25%',
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
})
