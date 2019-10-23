module.exports = {
    tableName: 'otp',
    attributes: {

        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
        mobile: {
            columnName: 'mobile',
            type: 'string',
            required: true,
            unique: true,
            maxLength: 200,
            example: '1234567'
        },

        otp: {
            columnName: 'otp',
            type: 'string',
            required: true,
            protect: true,
            example: '123456'
        }
    }
}