# 验证规则

@hapi/joi
@escook/express-joi

# 登录

## 实现步骤

1. 检测表单数据的合法性
2. 根据用户名查询用户的数据
3. 判断用户输入的密码是否正确
4. 生成JWT的Token字符串

# 今日所学

**温习前面知识**

- 创建验证规则
	使用@express/joi调用验证规则和@hapi/joi生成验证规则
- Api接口的实现
	登录api的处理函数实现
	获取用户信息的接口实现
	修改用户信息的接口的实现
	更新密码的接口的实现
- JWT鉴权
	使用express/jwt在路由前做解析中间件，解析token，并在req.user上挂载字段
	config.js配置jwt的密钥和过期时间
	使用JWT.sign()方法生成token，密钥中包含用户除密码和userpic的其他字段
- bcrypt
	使用bcrypt.hashSync(str, number) 生成掩码
	使用bcrypt.compareSync(new, old)解析掩码并对比
- 错误中间件的处理
	JWT身份认证失败的错误处理
