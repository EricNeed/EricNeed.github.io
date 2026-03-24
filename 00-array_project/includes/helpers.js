//find any point on the sphere around a point
function findPointAroundPoint(__x, __y, __z, v_angle, h_angle, dist){
    //__x__y__z: center sphere coord
    x = __x + dist * sin(v_angle) * cos(h_angle);
    y = __y + dist * sin(v_angle) * sin(h_angle);
    z = __z + dist * cos(v_angle);

    return [x, y, z];
}