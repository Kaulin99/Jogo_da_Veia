import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabu: {
    display: 'flex',
    flexDirection: 'column',
  },
  tabuLinha: {
    display: 'flex',
    flexDirection: 'row',
  },
  casa: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    fontSize: 60,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
});

export default styles;