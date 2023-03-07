import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {SetStateAction} from 'react';
import {Snackbar} from 'react-native-paper';

const SnackbarX = (props: {
  message: string;
  duration: number;
  children?: JSX.Element;
  visible: boolean;
  setError: React.Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const [visible, setVisible] = React.useState(props.visible);

  React.useEffect(() => {
    if (props.visible) {
      setVisible(pre => !pre);
      setTimeout(() => {
        setVisible(pre => !pre);
        props.setError(false);
      }, props.duration);
    }
  }, [props.duration, props.visible, props.setError, props]);

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.body}>
      <View style={styles.childContainer}>{props.children}</View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Dismiss',
          onPress: () => {},
        }}>
        {props.message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  childContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SnackbarX;
