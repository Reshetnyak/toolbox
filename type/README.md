# Synopsis

`type` function helps to be sure that there will be one unique action type in Redux application.

# Code example

In big projects there is possibility to make mistakes within the strings.

```javascript
// actionsA.ts
const SHOW_MODAL = 'SHOW_MODAL';

// somewhere else in ocean of folders
// actionsB.ts
const SHOW_MODAL = 'Show_Modal';
```

To avoid this, use `type` function

```javascript
import { type } from 'path/to/type';

// actionsA.ts
const SHOW_MODAL_ACTION_TYPE = type('SHOW_MODAL');

// somewhere else in ocean of folders
// actionsB.ts
const SHOW_MODAL_ACTION_TYPE = type('Show_Modal');
// will throw `Trying to register 'Load_User', but similar type 'LOAD_USER' is already being used in application`
```

# Motivation

It could happen because of lot of factors: new developer, huge project, human factor, etc.
It will not break any logic, because different reducer will be created. But it will cause a problem with reading actions in developer tools.