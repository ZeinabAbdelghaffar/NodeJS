class FlightTicket {
  constructor(seatNum, flightNum, departureAirport, arrivalAirport, travellingDate) {
    this.seatNum = seatNum;
    this.flightNum = flightNum;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.travellingDate = travellingDate;
  }

  displayInfo() {
    console.log(`Ticket Information:
      Seat Number: ${this.seatNum}
      Flight Number: ${this.flightNum}
      Departure Airport: ${this.departureAirport}
      Arrival Airport: ${this.arrivalAirport}
      Travelling Date: ${this.travellingDate}`);
  }

  getInfo() {
    return {
      seatNum: this.seatNum,
      flightNum: this.flightNum,
      departureAirport: this.departureAirport,
      arrivalAirport: this.arrivalAirport,
      travellingDate: this.travellingDate
    };
  }

  updateInfo(seatNum, flightNum, departureAirport, arrivalAirport, travellingDate) {
    this.seatNum = seatNum;
    this.flightNum = flightNum;
    this.departureAirport = departureAirport;
    this.arrivalAirport = arrivalAirport;
    this.travellingDate = travellingDate;
  }
}

export default FlightTicket;