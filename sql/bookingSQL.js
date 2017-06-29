const bookingSQL = {
    /**
     * param:
     *
     */
    register: '',//用户的所有除id以外的数据
    addUserCard:'',//用户id,卡的信息
    addUserAddress:'',//用户id,地址信息
    findUserByEmailName:'',//输入email,返回该用户属性
    findUserAddress:'',//输入id,返回用户的所有地址
    findUserCard:'',//输入id，返回用户的所有卡片信息
    findAllRapist:'',//无输入，直接返回结果
    addOrder:'',//输入用户id,按摩师id,时间，
    getAllOrder:''//用于时间冲突的判断
};
module.exports = bookingSQL;