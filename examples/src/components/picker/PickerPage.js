import React  from 'react';
import AnimationPage from '../Page'
import classNames from 'classnames';
import Picker from 'react-ui/picker'
require('react-ui/resources/less/forms.less')

class PickerPage extends AnimationPage{
  constructor(props) {
    super(props);
  }
   
  componentDidMount(){
    super.componentDidMount()
    var today = new Date();

    // iOS Device picker
    Picker.picker({
        input: '#ks-picker-device',
        toolbarCloseText: '关闭',
        cols: [
            {
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }
        ]
    });


     // Describe yourself picker
    Picker.picker({
        input: '#ks-picker-describe',
        rotateEffect: true,
        cols: [
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            }
        ]
    });

     // Dependent values
    var carVendors = {
        Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
        German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
        American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
    };
    Picker.picker({
        input: '#ks-picker-dependent',
        rotateEffect: true,
        formatValue: function (picker, values) {
            return values[1];
        },
        cols: [
            {
                textAlign: 'left',
                values: ['Japanese', 'German', 'American'],
                onChange: function (picker, country) {
                    if(picker.cols[1].replaceValues){
                        picker.cols[1].replaceValues(carVendors[country]);
                    }
                }
            },
            {
                values: carVendors.Japanese,
                width: 160
            }
        ]
    });


    // Custom Toolbar
    Picker.picker({
        input: '#ks-picker-custom-toolbar',
        rotateEffect: true,
        toolbarTemplate:
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link toolbar-randomize-link">Randomize</a>' +
                    '</div>' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">That\'s me</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        cols: [
            {
                values: ['Mr', 'Ms']
            },
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            }
        ],
        onOpen: function (picker) {
            picker.container.find('.toolbar-randomize-link').on('click', function (e) {
                e.preventDefault()
                var col0Values = picker.cols[0].values;
                var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

                var col1Values = picker.cols[1].values;
                var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

                var col2Values = picker.cols[2].values;
                var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];

                picker.setValue([col0Random, col1Random, col2Random]);
            });
        }
    });


    // Inline date-time
    Picker.picker({
        input: '#ks-picker-date',
        container: '#ks-picker-date-container',
        toolbar: false,
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('January February March April May June July August September October November December').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })()
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })()
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })()
            }
        ]
    });

  }
  
  render(){
  	return (
  	<div className={classNames( 'page', this.props.className)}>
	    <div className="page-content">

	      <div className="content-block">
          <p>Picker is a powerful component that allows you to create custom overlay pickers which looks like iOS native picker.</p>
          <p>Picker could be used as inline component or as overlay. Overlay Picker will be automatically converted to Popover on tablets (iPad).</p>
        </div>
        <div className="content-block-title">Picker with single value</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Your iOS device" readOnly="readonly" id="ks-picker-device" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">2 values and 3d-rotate effect</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Describe yourself" readOnly="readonly" id="ks-picker-describe" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Dependent values</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Your car" readOnly="readonly" id="ks-picker-dependent" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Custom toolbar</div>
        <div className="list-block">
          <ul>
            <li>
              <div className="item-content">
                <div className="item-inner">
                  <div className="item-input">
                    <input type="text" placeholder="Describe yourself" readOnly="readonly" id="ks-picker-custom-toolbar" />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="content-block-title">Inline Picker / Date-time</div>
        <div className="content-block">
          <div style={{padding:0, marginRight:'-15px', width: 'auto'}} className="content-block-inner">
            <div style={{margin:0}} className="list-block">
              <ul style={{borderTop: 'none'}}>
                <li>
                  <div className="item-content">
                    <div className="item-inner">
                      <div className="item-input">
                        <input type="text" placeholder="Date Time" readOnly="readonly" id="ks-picker-date" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div id="ks-picker-date-container"></div>
          </div>
        </div>

	    </div>
	  </div>
  	)
  }
}

module.exports = PickerPage
