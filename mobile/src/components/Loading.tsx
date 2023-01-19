import { ActivityIndicator, View } from 'react-native';

function Loading() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#09090a',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator color="#7C3AED"/>
    </View>
  );
}

export default Loading;
