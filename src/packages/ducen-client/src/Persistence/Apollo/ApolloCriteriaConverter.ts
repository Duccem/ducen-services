import { gql } from '@apollo/client';
import { Criteria, Filters } from '@ducen/core';
import capitalize from 'capitalize';
import pluralize from 'pluralize';

export class ApolloCriteriaConverter {
  public Query(model: string, fields?: string[], criteria?: Criteria) {
    const filters = this.Filters(criteria?.filters);
    const project = this.Project(fields);
    const order = criteria?.order?.orderType?.value || 'ASC';
    const orderBy = criteria?.order?.orderBy?.value || 'id';
    const offset = criteria?.paginator?.offset?.value || 0;
    const limit = criteria?.paginator?.limit?.value || 50;
    const query = `
      query ${pluralize(model)}($params: QueryParameters) {
        ${pluralize(model)}(params: $params) {
          ${project}
        }
      }
    `;
    return {
      query: gql(query),
      variables: {
        filters,
        order,
        orderBy,
        limit,
        offset,
      },
    };
  }

  public Get(id: string, model: string, fields: string[]) {
    const project = this.Project(fields);
    const query = `
      query ${model}($id: string) {
        ${model}s(params: $id) {
          ${project}
        }
      }
    `;
    return {
      query: gql(query),
      variables: {
        id,
      },
    };
  }

  public Filters(filters?: Filters) {
    return filters?.filters.map((filter) => ({
      field: filter.field.value,
      value: filter.value.value,
      operator: filter.operator.value,
    }));
  }

  public Project(fields?: string[]) {
    return fields?.join(',');
  }

  public Mutation(model: string, data: any) {
    const mutation = `
      mutation persist${capitalize(model)}($data: ${capitalize(model)}) {
        persist${capitalize(model)}(data: $data) {}
      }
    `;
    return {
      mutation: gql(mutation),
      variables: data,
    };
  }

  public Delete(model: string) {
    const mutation = `
      mutation delete${capitalize(model)}($id: String) {
        delete${capitalize(model)}(id: $id) {}
      }
    `;
    return {
      mutation: gql(mutation),
    };
  }

  public count(model: string, criteria?: Criteria) {
    const filters = this.Filters(criteria?.filters);
    const query = `
      query count${capitalize(pluralize(model))}($params: CountParameters) {
        count${capitalize(pluralize(model))}(params: $params) {
          count
        }
      }
    `;
    return {
      query: gql(query),
      variables: {
        filters,
      },
    };
  }

  public exist(model: string) {
    const query = `
      query exist${capitalize(model)}($id: String) {
        exist${capitalize(model)}(id: $id) {
        }
      }
    `;
    return {
      query: gql(query),
    };
  }

  public search(model: string, text: string, fields: string[]) {
    const project = this.Project(fields);
    const query = `
      query search${capitalize(pluralize(model))}($text: String) {
        search${capitalize(pluralize(model))}(text: $text) {
          ${project}
        }
      }
    `;
    return {
      query: gql(query),
      variables: {
        text,
      },
    };
  }
}
