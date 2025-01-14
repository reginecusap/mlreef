import { handleResponse } from 'functions/helpers';
import ApiDirector from 'apis/ApiDirector';
import BodyLessApiRequestCallBuilder from 'apis/apiBuilders/BLApiRequestCallBuilder';
import { METHODS, validServicesToCall } from 'apis/apiBuilders/requestEnums';
import ApiRequestCallBuilder from 'apis/apiBuilders/ApiRequestCallBuilder';

export default class GitlabPipelinesApi extends ApiDirector {
  abortGitlabPipelines(gitlabProjectId: number, pipelineId: number) {
    const bl = new BodyLessApiRequestCallBuilder(
      METHODS.POST,
      this.buildBasicHeaders(validServicesToCall.GITLAB),
      `/api/v4/projects/${gitlabProjectId}/pipelines/${pipelineId}/cancel`,
    );
    return fetch(bl.build())
      .then(handleResponse);
  }

  // TODO: test pipelines creation
  create(projectId: number, refBranch: string, payload: any) {
    const body = JSON.stringify(payload);
    const bl = new ApiRequestCallBuilder(
      METHODS.POST,
      this.buildBasicHeaders(validServicesToCall.GITLAB),
      `/api/v4/projects/${projectId}/pipeline?ref=${refBranch}`,
      body,
    );

    return fetch(bl.build())
      .then(handleResponse);
  }

  getPipesByProjectId(projectId: number) {
    const bl = new BodyLessApiRequestCallBuilder(
      METHODS.GET,
      this.buildBasicHeaders(validServicesToCall.GITLAB),
      `/api/v4/projects/${projectId}/pipelines`,
    );
    return fetch(bl.build())
      .then(handleResponse);
  }

  getPipesById(projectId: number, pipeId: number) {
    const bl = new BodyLessApiRequestCallBuilder(
      METHODS.GET,
      this.buildBasicHeaders(validServicesToCall.GITLAB),
      `/api/v4/projects/${projectId}/pipelines/${pipeId}`,
    );
    return fetch(bl.build())
      .then(handleResponse);
  }
}
