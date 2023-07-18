import {__, allPass, any, compose, countBy, dissoc, equals, gte, identity, prop, values, propEq, complement} from 'ramda';

const excludeWhite = dissoc('white');

const getStar     = prop('star');
const getTriangle = prop('triangle');
const getSquare   = prop('square');
const getCircle   = prop('circle');
const getGreen    = prop('green');

const getNumberOfColors             = compose(countBy(identity), values);
const getNumberOfColorsWhitoutWhite = compose(excludeWhite, getNumberOfColors);
const getNumberOfGreenColors        = compose(getGreen, getNumberOfColors);

const hasTwoGreens = propEq('green', 2);
const hasOneReds   = propEq('red', 1);

const greaterOrEqualsThenTwo   = gte(__, 2)
const greaterOrEqualsThenThree = gte(__, 3)

const anyGreaterOrEqualsThenThree      = any(greaterOrEqualsThenThree);
const anyValueGreaterOrEqualsThenThree = compose(anyGreaterOrEqualsThenThree, values);

const isRed              = equals('red');
const isWhite            = equals('white');
const isGreen            = equals('green');
const isOrange           = equals('orange');
const isBlue             = equals('blue');
const isRedStar          = compose(isRed, getStar);
const isWhiteStar        = compose(isWhite, getStar);
const isNotRedStar       = complement(isRedStar);
const isNotWhiteStar     = complement(isWhiteStar);
const isWhiteCircle      = compose(isWhite, getCircle);
const isBlueCircle       = compose(isBlue, getCircle);
const isWhiteTriangle    = compose(isWhite, getTriangle);
const isGreenTriangle    = compose(isGreen, getTriangle);
const isNotWhiteTriangle = complement(isWhiteTriangle);
const isGreenSquare      = compose(isGreen, getSquare);
const isOrangeSquare     = compose(isOrange, getSquare);
const isWhiteSquare      = compose(isWhite, getSquare);
const isNotWhiteSquare   = complement(isWhiteSquare);

const redCountEqualsBlueCount        = ({blue, red}) => blue === red;
const squareCountEqualsTriangleCount = ({square, triangle}) => square === triangle;

const hasTwoGreenColors = compose(hasTwoGreens, getNumberOfColors);
const hasOneRedColor    = compose(hasOneReds, getNumberOfColors);

const allHasColor = color => compose(propEq(color, 4), getNumberOfColors);

// 1. Красная звезда, зеленый квадрат – все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(greaterOrEqualsThenTwo, getNumberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redCountEqualsBlueCount, getNumberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueGreaterOrEqualsThenThree, getNumberOfColorsWhitoutWhite);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([isGreenTriangle, hasTwoGreenColors, hasOneRedColor]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allHasColor('orange');

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allHasColor('green');

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle, squareCountEqualsTriangleCount]);