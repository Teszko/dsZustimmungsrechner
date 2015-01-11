/**
 * @author Bartosz Henryk Iwaniuk
 * mail: b.iwaniuk@campus.tu-berlin.de
 * some linear algebra and stuff... (dropping some numpy shizzles)
 * matrices are 2d arrays (A[m][n]), vectors are arrays
 */


/**
 * returns a m-by-m matrix filled with zeros.
 * @param m  size of matrix
 * @returns {Array}  matrix
 */


function initMatrixR2 (m) {
    var M = new Array(m);
    for (var i=0; i<m; i++) {
        M[i] = Array.apply(null, new Array(m)).map(Number.prototype.valueOf, 0);
    }
    return M;
}

/**
 * returns a m-dimensional vector filled with zeros
 * @param m size of vector
 * @returns {Array}  vector
 */

function initVector (m) {
    var v = Array.apply(null, new Array(m)).map(Number.prototype.valueOf, 0);
    return v;
}


/**
 * multiplies matrix with a vector. returns product.
 * @param A matrix
 * @param v vector
 * @returns {Array} result
 */

function matrixVectorMultiplication (A, v) {
    var y = Array.apply(null, new Array(v.length)).map(Number.prototype.valueOf, 0);
    for (var i=0; i<A.length; i++) {
        for (var j=0; j<v.length; j++) {
            y[i] += A[j][i] * v[j];
        }
    }
    return y;
}

function fillMarkoff (M, skip, range) {
    var m = M.length;
    for (var i=0; i<m; i++) {
        if ((i+skip-m) >= 0) {
            M[i][m-1] = 1;
        } else {
            var ratio = 1 / Math.min(range+1, m-(i+skip));
            for (var j = 0; j < m; j++) {
                if (j >= (i + skip) && j <= (i + skip + range)) {
                    M[i][j] = ratio;
                }
            }
        }
    }
    return M;
}

function normaliseValues (states) {
    for (var i=0; i<states.length; i++) {
        for (var j=0; j<states[i].length; j++) {
            states[i][j] = (Math.round(states[i][j] * 10000) / 100);
        }
    }

    return states;
}

function initMarkox (sv) {
    sv = Math.min(100, Math.max(0, sv));
    A = initMatrixR2(101);
    M = fillMarkoff(A, 20, 10);
    v = initVector(101);
    v[100-sv] = 1;
    state = []
    state.push(v);
    for (var i = 0; i < 6; i++) {
        state.push(matrixVectorMultiplication(M, state[i]));
    }
    state = normaliseValues(state);
    return state
}

state = initMarkox(100);
/*
console.log(M);
console.log(v);
v1 = matrixVectorMultiplication (M, v);
console.log(v);
v2 = matrixVectorMultiplication (M, v1);
console.log(v);
v3 = matrixVectorMultiplication (M, v2);
console.log(v);
v4 = matrixVectorMultiplication (M, v3);
console.log(v);
v5 = matrixVectorMultiplication (M, v4);
console.log(v); */
