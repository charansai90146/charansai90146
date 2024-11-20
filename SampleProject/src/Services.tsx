import axios from 'axios';
import { from } from 'rxjs'; // RxJS to convert promise to observable

// API base URL
const Baseurl = 'http://localhost:5248/api/Candidate/';

// Function to fetch candidates (GET request)
export function candidates(data:any) {
  return from(axios.post(`${Baseurl}`,data)); 
}
export function candidatesget() {
    return from(axios.get(`${Baseurl}GetCandidates`)); 
  }
  export function deleteCandidate(id) {
    return from(axios.delete(`${Baseurl}${id}`));
  }

  export function putCandidate(id, data) {
    return from(axios.put(`${Baseurl}${id}`,data)); 
  }