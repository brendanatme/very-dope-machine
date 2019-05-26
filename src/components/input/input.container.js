/**
 * input.container
 *
 * control input within state
 * handle validation
 * and debounce returning value back to parent
 */
import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import InputComponent from './input.component';

export default class Input extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    delay: PropTypes.number,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onChangeRaw: PropTypes.func,
    type: PropTypes.string,
    validate: PropTypes.func,
    value: PropTypes.string.isRequired,
  }

  static defaultProps = {
    delay: 350,
  }

  constructor(props, context) {
    super(props, context);

    this.VALIDATE = input => new Promise(resolve => resolve(input));

    /**
     * create a debounced event handler to make
     */
    this.debouncedOnChange = debounce(this.props.onChange, this.props.delay);
    this.input = React.createRef();
    this.isTyping = false;
    this.state = { value: props.value, error: '' };
  }

  /**
   * when component mounts, focus the input element
   */
  componentDidMount() {
    if (this.input.current && this.input.current.focus) {
      this.input.current.focus();
    }
  }

  /**
   * if any props affecting our debounced onChange handler have changed,
   * reset our debounced onchange handler
   *
   * if the value has changed, and user is not typing,
   * set the value on the state
   *
   * @param {any} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.onChange !== this.props.onChange || nextProps.delay !== this.props.delay) {
      this.debouncedOnChange.cancel();
      this.debouncedOnChange = debounce(nextProps.onChange, nextProps.delay);
    }

    if (nextProps.value !== this.props.value && !this.isTyping) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  /**
   * when component will unmount, blur the input element
   */
  componentWillUnmount() {
    if (this.input.current && this.input.current.blur) {
      this.input.current.blur();
    }
  }

  /**
   * handleValid
   * run callback after successful input has validated
   * after running, reset isTyping state to default
   */
  handleValid(value) {
    if (!this.props.delay) {
      this.props.onChange(value);
    } else {
      this.debouncedOnChange(value);
      this.isTyping = false;
    }

    this.setState({ error: '' });
  }

  handleError(errors) {
    this.setState({ error: errors.map(err => err.error).join(', ') });
  }

  /**
   * handleChange
   * this indicates an input change
   * clear the debounced callback
   * and set a new one
   */
  handleChange = (e) => { // eslint-disable-line no-unused-vars
    const value = e.target.value;
    const validate = this.props.validate || this.VALIDATE;

    this.isTyping = true;

    /**
     * for when you need realtime side-effects
     */
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(value);
    }

    if (this.props.delay) {
      this.debouncedOnChange.cancel();
    }

    this.setState({ value }, () => {
      validate(value)
        .then(() => this.handleValid(value))
        .catch(err => this.handleError(err));
    });
  }

  /**
   * on element blur,
   * handle the latest changed value
   * and call an onblur prop if provided
   */
  handleBlur = (e) => {
    this.handleChange(e);
    if (typeof this.props.onBlur === 'function') {
      this.props.onBlur();
    }
  }

  /**
   * handleKeyDown
   *
   * when ESC or RETURN is pressed,
   * blur the element
   *
   * when up or down is pressed,
   * and the input type is a number,
   * increment/decrement the value
   */
  handleKeyDown = (e) => {
    console.log('handleKeyDown', e); // eslint-disable-line
  }

  render() {
    return (
      <InputComponent
        className={this.props.className}
        id={this.props.id}
        label={this.props.label}
        name={this.props.name}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        ref={this.input}
        type={this.props.type}
        value={this.state.value}
      />
    );
  }
}
