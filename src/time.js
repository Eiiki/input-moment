var cx = require('classnames');
var React = require('react');
var InputSlider = require('react-input-slider');

module.exports = React.createClass({
  displayName: 'Time',

  getDefaultProps() {
    return {
      minuteStep: 1.0
    };
  },

  componentDidMount() {
    this.changeMinutes({x: this.props.moment.minutes()})
  },

  render() {
    var m = this.props.moment;

    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <span className="time">{m.format('HH')}</span>
          <span className="separater">:</span>
          <span className="time">{m.format('mm')}</span>
        </div>

        <div className="sliders">
          <div className="time-text">Klukkutími:</div>
          <InputSlider
            className="u-slider-time"
            xmin={+this.props.minTime.split(":")[0]}
            xmax={+this.props.maxTime.split(":")[0] || 23}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className="time-text">Mínúta:</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={55}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  },

  isValidTime(hour, minute){
    var minutes = {
      min: +this.props.minTime.split(":")[1],
      max: +this.props.maxTime.split(":")[1]
    };
    var hours = {
      min: +this.props.minTime.split(":")[0],
      max: +this.props.maxTime.split(":")[0]
    };

    if(hour > hours.min && hour < hours.max)
      return true;
    if(hours.min === hours.max && minutes.min === minutes.max)
      return true;

    if(hour === hours.min){
      if(minute >= minutes.min)
        return true;
    }

    if(hour === hours.max){
      if(minute <= minutes.max)
        return true;
    }

    return false;
  },

  changeHours(pos) {
    var m = this.props.moment;
    var hour = parseInt(pos.x, 10);
    if(this.isValidTime(hour, m.minutes())){
      m.hours(hour);
      this.props.onChange(m);
    }
  },

  changeMinutes(pos) {
    var step = +this.props.minuteStep * 1.0
    var m = this.props.moment;
    var xRound = step * Math.round(pos.x/step);
    var minute = Math.min(55, parseInt(xRound, 10));
    if(this.isValidTime(m.hours(), minute)){
      m.minutes(minute);
      this.props.onChange(m);
    }
  }
});
