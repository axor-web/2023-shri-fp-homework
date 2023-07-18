import Api from '../tools/api';
import {__, allPass, andThen, assoc, compose, concat, gt, ifElse, length, lt, mathMod, otherwise, partial, prop, tap, test} from "ramda";

const api = new Api();

const square = num => num ** 2;
const gtTwo = gt(__, 2);
const ltTen = lt(__, 10);

const modForThreeToString = compose(String, mathMod(__, 3));

const thenSquare = andThen(square);
const thenModOfThreeToString = andThen(modForThreeToString);
const thenGetLength = andThen(length);

const lengthGreaterThenTwo = compose(gtTwo, length);
const lengthLowerThenTen = compose(ltTen, length);

const roundStringToNumber = compose(Math.round, Number);

const testOnlyNumbers = test(/^[0-9]+\.?[0-9]+$/);

const validate = allPass([lengthGreaterThenTwo, lengthLowerThenTen, testOnlyNumbers]);

const API_NUMBERS_URL = 'https://api.tech/numbers/base';
const API_ANIMALS_URL = 'https://animals.tech/';
const getApiResult = compose(String, prop('result'));

const assocNumberToBinary = assoc('number', __, { from: 10, to: 2 });

const apiGetNumberBinaryBase = compose(
    api.get(API_NUMBERS_URL),
    assocNumberToBinary
) ;

const thenGetApiResult = andThen(getApiResult);
const thenConcatToAnimalsUrl = andThen(concat(API_ANIMALS_URL));
const thenCallApiWithEmptyParams = andThen(api.get(__, {}));

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const tapLog = tap(writeLog);
    const thenTapLog = andThen(tapLog);
    const thenHandleSuccess = andThen(handleSuccess);
    const otherwiseHandleError = otherwise(handleError);

    const handleValidationError = partial(handleError, ['ValidationError']);

    const sequenceComposition = compose(
        otherwiseHandleError,
        thenHandleSuccess,
        thenGetApiResult,
        thenCallApiWithEmptyParams,
        thenConcatToAnimalsUrl,
        thenTapLog,
        thenModOfThreeToString,
        thenTapLog,
        thenSquare,
        thenTapLog,
        thenGetLength,
        thenTapLog,
        thenGetApiResult,
        apiGetNumberBinaryBase,
        tapLog,
        roundStringToNumber,
    );

    const runWithCondition = ifElse(validate, sequenceComposition, handleValidationError);
    const logAndRunSequence = compose(runWithCondition, tapLog);

    logAndRunSequence(value);
};

export default processSequence;
