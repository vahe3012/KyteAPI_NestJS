export interface IBooking {
  id: number;
  user_id: number;
  flight_id: number;
  date: string; //karam heto function grem vor string@ Date sarqi
  status: string;
}
