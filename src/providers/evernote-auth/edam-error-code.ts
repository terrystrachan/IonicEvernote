
export enum EdamErrorCode {
    'UNKNOWN' = 1,
    'BAD_DATA_FORMAT',
    'PERMISSION_DENIED',
    'INTERNAL_ERROR',
    'DATA_REQUIRED',
    'LIMIT_REACHED',
    'QUOTA_REACHED',
    'INVALID_AUTH',
    'AUTH_EXPIRED',
    'DATA_CONFLICT',
    'ENML_VALIDATION',
    'SHARD_UNAVAILABLE',
    'LEN_TOO_SHORT',
    'LEN_TOO_LONG',
    'TOO_FEW',
    'TOO_MANY',
    'UNSUPPORTED_OPERATION',
    'TAKEN_DOWN',
    'RATE_LIMIT_REACHED',
    'BUSINESS_SECURITY_LOGIN_REQUIRED',
    'DEVICE_LIMIT_REACHED'
}

enum EdamErrorMessage {

    'UNKNOWN' = 'No information available about the error',
    'BAD_DATA_FORMAT' = 'The format of the request data was incorrect',
    'PERMISSION_DENIED' = 'Not permitted to perform action',
    'INTERNAL_ERROR' = 'Unexpected problem with the service',
    'DATA_REQUIRED' = 'A required parameter/field was absent',
    'LIMIT_REACHED' = 'Operation denied due to data model limit',
    'QUOTA_REACHED' = 'Operation denied due to user storage limit',
    'INVALID_AUTH' = 'Username and/or password incorrect',
    'AUTH_EXPIRED' = 'Authentication token expired',
    'DATA_CONFLICT' = 'Change denied due to data model conflict',
    'ENML_VALIDATION' = 'Content of submitted note was malformed',
    'SHARD_UNAVAILABLE' = 'Service shard with account data is temporarily down',
    'LEN_TOO_SHORT' = 'Operation denied due to data model limit, where something such as a string length was too short',
    'LEN_TOO_LONG' = 'Operation denied due to data model limit, where something such as a string length was too long',
    'TOO_FEW' = 'Operation denied due to data model limit, where there were too few of something.',
    'TOO_MANY' = 'Operation denied due to data model limit, where there were too many of something.',
    'UNSUPPORTED_OPERATION' = 'Operation denied because it is currently unsupported.',
    'TAKEN_DOWN' = 'Operation denied because access to the corresponding object is prohibited in response to a take-down notice.',
    'RATE_LIMIT_REACHED' = 'Operation denied because the calling application has reached its hourly API call limit for this user.',
    'BUSINESS_SECURITY_LOGIN_REQUIRED' = 'Access to a business account has been denied because the user must complete additional steps in order to comply with business security requirements.',
    'DEVICE_LIMIT_REACHED' = 'Operation denied because the user has exceeded their maximum allowed number of devices.'

}
export class EdamErrorHandler {
    static getEdamErrorMessage(errorCode: number): string {
        return EdamErrorMessage[EdamErrorCode[errorCode]];
    }
}

//EDAMUserException - need to expand this class