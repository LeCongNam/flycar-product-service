export type Mapping<T> = {
  properties: {
    [P in keyof T]: {
      type: string;
      analyzer?: string;
      format?: string;
      [key: string]: any; // Allow additional properties
    };
  };
} & {
  index?: never;
  allow_no_indices?: never;
  expand_wildcards?: never;
  ignore_unavailable?: never;
  master_timeout?: never;
  timeout?: never;
  write_index_only?: never;
  date_detection?: never;
  dynamic?: never;
  dynamic_date_formats?: never;
  dynamic_templates?: never;
  _field_names?: never;
  _meta?: never;
  numeric_detection?: never;
  properties?: never;
  _routing?: never;
  _source?: never;
  runtime?: never;
};
