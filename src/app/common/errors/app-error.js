"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppError = /** @class */ (function () {
    function AppError(originalError) {
        this.originalError = originalError;
    }
    return AppError;
}());
exports.AppError = AppError;
/**
 * 400 Unauthorized
 */
var BadRequest = /** @class */ (function (_super) {
    __extends(BadRequest, _super);
    function BadRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BadRequest;
}(AppError));
exports.BadRequest = BadRequest;
/**
 * 401 Unauthorized
 */
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnauthorizedError;
}(AppError));
exports.UnauthorizedError = UnauthorizedError;
/**
 * 404 Not Found
 */
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotFoundError;
}(AppError));
exports.NotFoundError = NotFoundError;
/**
 * 500 Internal Server
 */
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalServerError;
}(AppError));
exports.InternalServerError = InternalServerError;
/**
 * 501 Internal Server
 */
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NotImplementedError;
}(AppError));
exports.NotImplementedError = NotImplementedError;
/**
 * 550 Permission Denied
 */
var PermissionDeniedError = /** @class */ (function (_super) {
    __extends(PermissionDeniedError, _super);
    function PermissionDeniedError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PermissionDeniedError;
}(AppError));
exports.PermissionDeniedError = PermissionDeniedError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLWVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7SUFDSSxrQkFBbUIsYUFBbUI7UUFBbkIsa0JBQWEsR0FBYixhQUFhLENBQU07SUFBRyxDQUFDO0lBQzlDLGVBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDRCQUFRO0FBSXJCOztHQUVHO0FBQ0g7SUFBZ0MsOEJBQVE7SUFBeEM7O0lBQTBDLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBM0MsQ0FBZ0MsUUFBUSxHQUFHO0FBQTlCLGdDQUFVO0FBRXZCOztHQUVHO0FBQ0g7SUFBdUMscUNBQVE7SUFBL0M7O0lBQ0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQURELENBQXVDLFFBQVEsR0FDOUM7QUFEWSw4Q0FBaUI7QUFHOUI7O0dBRUc7QUFDSDtJQUFtQyxpQ0FBUTtJQUEzQzs7SUFBNkMsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBQyxBQUE5QyxDQUFtQyxRQUFRLEdBQUc7QUFBakMsc0NBQWE7QUFFMUI7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBUTtJQUFqRDs7SUFBbUQsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FBQyxBQUFwRCxDQUF5QyxRQUFRLEdBQUc7QUFBdkMsa0RBQW1CO0FBRWhDOztHQUVHO0FBQ0g7SUFBeUMsdUNBQVE7SUFBakQ7O0lBQW1ELENBQUM7SUFBRCwwQkFBQztBQUFELENBQUMsQUFBcEQsQ0FBeUMsUUFBUSxHQUFHO0FBQXZDLGtEQUFtQjtBQUVoQzs7R0FFRztBQUNIO0lBQTJDLHlDQUFRO0lBQW5EOztJQUFxRCxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQUFDLEFBQXRELENBQTJDLFFBQVEsR0FBRztBQUF6QyxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQXBwRXJyb3Ige1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG9yaWdpbmFsRXJyb3I/OiBhbnkpIHt9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiA0MDAgVW5hdXRob3JpemVkXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQmFkUmVxdWVzdCBleHRlbmRzIEFwcEVycm9yIHt9XHJcblxyXG4vKipcclxuICogNDAxIFVuYXV0aG9yaXplZFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFVuYXV0aG9yaXplZEVycm9yIGV4dGVuZHMgQXBwRXJyb3Ige1xyXG59XHJcblxyXG4vKipcclxuICogNDA0IE5vdCBGb3VuZFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE5vdEZvdW5kRXJyb3IgZXh0ZW5kcyBBcHBFcnJvciB7fVxyXG5cclxuLyoqXHJcbiAqIDUwMCBJbnRlcm5hbCBTZXJ2ZXJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBJbnRlcm5hbFNlcnZlckVycm9yIGV4dGVuZHMgQXBwRXJyb3Ige31cclxuXHJcbi8qKlxyXG4gKiA1MDEgSW50ZXJuYWwgU2VydmVyXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm90SW1wbGVtZW50ZWRFcnJvciBleHRlbmRzIEFwcEVycm9yIHt9XHJcblxyXG4vKipcclxuICogNTUwIFBlcm1pc3Npb24gRGVuaWVkXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUGVybWlzc2lvbkRlbmllZEVycm9yIGV4dGVuZHMgQXBwRXJyb3Ige31cclxuIl19