import React, { TouchableHighlight, Image, StyleSheet, PropTypes } from 'react-native';

const propTypes = {
 // src: PropTypes.func.isRequired,
};

class ClsoeIcon extends React.Component {
  constructor(props) {
    super(props);
    this.styles = StyleSheet.create({
      icon: {
        width: 21,
        height: 21,
        marginTop: 4,
       
      },
    });

    this.goToSearch = this.goToSearch.bind(this);
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.close}>
        <Image source={require('../images/delete-48.png')} style={this.styles.icon} />
      </TouchableHighlight>
    );
  }
}

SearchIcon.propTypes = propTypes;

export default SearchIcon;
