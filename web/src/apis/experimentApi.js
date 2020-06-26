import { toastr } from 'react-redux-toastr';
import { getCurrentToken, generateGetRequest } from './apiHelpers';

export default class ExperimentsApi {
  static buildPostHeaders() {
    return new Headers({
      'PRIVATE-TOKEN': getCurrentToken(),
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Origin: 'http://localhost',
    });
  }

  static async createExperiment(backendId, body) {
    const response = await fetch(
      `/api/v1/data-projects/${backendId}/experiments`, {
        method: 'POST',
        headers: this.buildPostHeaders(),
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) {
      return Promise.reject(response);      
    }
    return response.json();
  }

  static async startExperiment(dataProjectId, experimentId) {
    const response = await fetch(
      `/api/v1/data-projects/${dataProjectId}/experiments/${experimentId}/start`, {
        method: 'POST',
        headers: this.buildPostHeaders(),
      },
    );
    if (!response.ok) {
      Promise.reject(response);
      toastr.error('Error', 'Server error while starting the experiment');
    }
    return response;
  }

  static async getExperimentDetails(backendId, experimentID) {
    const url = `/api/v1/data-projects/${backendId}/experiments/${experimentID}`;
    const response = await generateGetRequest(url);
    if (!response.ok) {
      Promise.reject(response);
      toastr.error('Error', 'Server error while fetching the experiment details');
    }
    return response.json();
  }

  static async getExperiments(backendId) {
    const url = `/api/v1/data-projects/${backendId}/experiments`;
    const response = await generateGetRequest(url);
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json();
  }
}