/**
 * Utility class for extracting Client Instructions from Requests
 */
/**
 *
 * @type {string}
 */
var header_prefix = "X-Knockoff";
/**
 *
 * @type {{status_code_override: {query: string, header: string}}}
 */
var client_instructions = {
  status_code_override: {
    query: "status_code_override",
    header: header_prefix + "-Status-Code-Override"
  }
};

function ClientDirectives(req) {
  this.req = req;
}

/**

 */
/**
 * Look for:
 *   status_code_override=* in the URL query params
 * OR
 *   X-Knockoff-Status-Code-Override in request headers
 *
 * If found, override the response code to that value.
 * If the value is 200..299, continue with next(), else
 * finalize the request here.
 *
 * @returns {number|undefined}
 */
ClientDirectives.prototype.get_status_code_override = function(){
  var status_code_override = null;
  var query_instruction = this.get_query_instruction("status_code_override");
  var header_override = this.get_header_instruction("status_code_override");
  if(query_instruction !== undefined) {
    status_code_override = query_instruction;
  } else {
    status_code_override = header_override;
  }
  return status_code_override;
};

/**
 *
 * @param {string} instruction_name
 * @returns {string}
 */
ClientDirectives.prototype.get_query_instruction = function(instruction_name){
  var query_param_name = client_instructions[instruction_name].query;
  var query_param_value = this.req.query[query_param_name];
  console.log("Query Param:",query_param_name,"had value:",query_param_value);
  return query_param_value;
};
/**
 *
 * @param {string} instruction_name
 * @returns {string}
 */
ClientDirectives.prototype.get_header_instruction = function(instruction_name){
  var header_param_name = client_instructions[instruction_name].header;
  var header_param_value = this.req.header(header_param_name);
  console.log("Request Header:",header_param_name,"had value:",header_param_value);
  return header_param_value;
};

module.exports = ClientDirectives;
