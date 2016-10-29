## Modules

<dl>
<dt><a href="#module_src/validators">src/validators</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ValidationResult">ValidationResult</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ValidatorObject">ValidatorObject</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_src/validators"></a>

## src/validators

* [src/validators](#module_src/validators)
    * [.object(propertyList)](#module_src/validators.object) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
    * [.string(min, max)](#module_src/validators.string) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
    * [.number(min, max)](#module_src/validators.number) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
    * [.email()](#module_src/validators.email) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
    * [.empty()](#module_src/validators.empty) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
    * [.oneOf(validators)](#module_src/validators.oneOf) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
    * [.arrayOf(validator)](#module_src/validators.arrayOf) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>

<a name="module_src/validators.object"></a>

### src/validators.object(propertyList) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
Validator of object type

**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  

| Param | Type |
| --- | --- |
| propertyList | <code>Object</code> | 

**Example**  
```js
let validator = validation({
     user: validator.object({
         name: validator.string(2, 15),
         email: validator.email(),
         lastName: [validator.empty(), validator.string(2, 25)]
     })
});

validator({
     user: {
         name: 'Klark',
         email: 'superman@superhero-team.com',
         lastName: 'Kent'
     }
}); // {success: true}
```
<a name="module_src/validators.string"></a>

### src/validators.string(min, max) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
validator of string type

**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | minimum length of string |
| max | <code>Number</code> | maximum length of string |

**Example**  
```js
let validator = validation({
     name: validator.string(2, 15)
});

validator({
     name: 'Klark'
}); // {success: true}
```
<a name="module_src/validators.number"></a>

### src/validators.number(min, max) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
validator of number type

**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  

| Param | Type | Description |
| --- | --- | --- |
| min | <code>Number</code> | minimum of number |
| max | <code>Number</code> | maximum of number |

**Example**  
```js
let validator = validation({
     age: validator.number(2, 15)
});

validator({
     age: 18
}); // {success: false}
```
<a name="module_src/validators.email"></a>

### src/validators.email() ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
validator of email

**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  
**Example**  
```js
let validator = validation({
     email: validator.email()
});

validator({
     email: 'test'
}); // {success: false}
```
<a name="module_src/validators.empty"></a>

### src/validators.empty() ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
if the validator declared for item, then is item has empty value, return success. Empty values: '', null, undefined

**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  
**Example**  
```js
let validator = validation({
     email: [validator.empty(), validator.email()]
});

validator({
     email: 'test'
}); // {success: false}

validator({
     email: ''
}); // {success: true}
```
<a name="module_src/validators.oneOf"></a>

### src/validators.oneOf(validators) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  

| Param | Type |
| --- | --- |
| validators | <code>[Array.&lt;ValidatorObject&gt;](#ValidatorObject)</code> | 

**Example**  
```js
let validator = validation({
     email: validator.oneOf([validator.number(), validator.email()])
});

validator({
     email: 'test@test.com'
}); // {success: true}
```
<a name="module_src/validators.arrayOf"></a>

### src/validators.arrayOf(validator) ⇒ <code>[ValidatorObject](#ValidatorObject)</code>
check items of array

**Kind**: static method of <code>[src/validators](#module_src/validators)</code>  

| Param | Type |
| --- | --- |
| validator | <code>[ValidatorObject](#ValidatorObject)</code> | 

**Example**  
```js
let validator = validation({
     digits: validator.arrayOf(validator.number())
});

validator({
     digits: [1, 2, 3]
}); // {success: true}
```
<a name="ValidationResult"></a>

## ValidationResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| success | <code>Boolean</code> | status of validation |

<a name="ValidatorObject"></a>

## ValidatorObject : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | unique name of validator |
| handler | <code>function</code> | function returned ValidationResult |

