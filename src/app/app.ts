/*
 * Angular 2 decorators and services
 */
import {Component} from 'angular2/core';
import {D3_DIRECTIVES} from '../angularD3';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app', // <app></app>
  providers: [],
  directives: [D3_DIRECTIVES],
  pipes: [],
  template: require('./app.html')
})
export class App {
  dataUrl: string
  line: {}[]
  pie: {}[]
  margin = { top: 40, right: 60, bottom: 40, left: 60 }
  columns = ['savings', 'total', 'optimal']
  tickValues = [200, 400, 600, 800]

  arcs = {
    arc1: { value: 60, label: '60%' },
    arc2: { value: 90, label: '90%' },
  }

  gradient = [
    { offset: '0%', color: '#098aae', opacity: 0.6 },
    { offset: '100%', color: '#684684', opacity: 0.9 },
  ]

  customTimeFormat = [
    ["%a %d", (d) => { return d.getDay() && d.getDate() !== 1 }],
    ["%b %d", (d) => { return d.getDate() !== 1 }],
    ["%b", (d) => { return d.getMonth() }],
    ["%Y", () => { return true }],
  ]

  constructor() {
    this.arcs = {
      arc1: { value: 60, label: '60%' },
      arc2: { value: 90, label: '90%' },
    }
    this.dataUrl = require('./data/data.csv')
  }

  lineLoaded(event) { this.line = event.rows; }

  pieLoaded(event) { this.pie = event.rows }

  parseValues(row) {
    for (var key in row) {
      var value = row[key].trim()
      if (key === 'date') {
        row[key] = new Date(value)
      } else if (!isNaN(parseFloat(value)) && isFinite(value)) {
        row[key] = +value.trim()
      }
    }
    return row
  }

  stackDomain(data) {
    return data.map((value) => {
      return +value.savings + value.total + value.optimal
    })
  }

  log(data) { console.log(data) }
}
