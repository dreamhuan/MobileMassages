const bookingSQL = {
    /**
     * param:
     *   firstName,lastName, emailAddress, mobileNumber, passWord
     *
     */
    register: 'INSERT INTO mobilemassages.user (firstName, lastName, emailAddress, mobileNumber, passWord) VALUES (?, ?, ?, ?, ?)',//用户的所有除id以外的数据

    /**
     * param:
     *
     *
     */
    addUserCard:'',//用户id,卡的信息

    /**
     * param:
     *
     *
     */
    addUserAddress:'',//用户id,地址信息

    /**
     * param:
     *
     *
     */
    findUserByEmailName:'select * from mobilemassages.user where emailAddress=?',//输入email,返回该用户属性

    /**
     * param:
     *
     *
     */
    findUserAddress:'',//输入id,返回用户的所有地址

    /**
     * param:
     *
     *
     */
    findUserCard:'',//输入id，返回用户的所有卡片信息

    /**
     * param:
     *
     *
     */
    findAllRapist:'',//无输入，直接返回结果

    /**
     * param:
     *
     *
     */
    addOrder:'',//输入用户id,按摩师id,时间，

    /**
     * param:
     *
     *
     */
    getAllOrder:''//用于时间冲突的判断
};
module.exports = bookingSQL;