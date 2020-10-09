const pencilIcon = new Image();
pencilIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQUOhdRws4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABGElEQVRIx9XUIW/CQBiA4ZcFwRQhkEEysEdSNAoFPwKBmcXO4FBTwxB+Av8BDQo1PQi1sGSChKBGMsHUkR7XMnpfQ8KnWvO8vVzv4N4nJQV+Doejfn7MZCwvLcVbShnv55G0FB88P+E1agC0lLIiDyL8NUe5n2cx/wRg0m6eIs4BA6+WAIyInko2e4wdCMMBNqtvaP9akVh7cBEHytUSna8lU99HFYvxftOr8K6Jr/f71FUBCf5vQIpfDCSBRwaSwkMDSeLWOdB4/6VJb7gT45EHreDVGb336HSXItwIBL9ej16JKx66goJXB2C7+DhFXHFjk4N3u17F23gG4IxHBvRMfR/AGbd+0+A9HoRd8dBzoO9xKXyz+QMErgZJQZj0xAAAAABJRU5ErkJggg==';

const lineIcon = new Image();
lineIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVD1j5N6wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAeklEQVRIx2NgGAWjYBTQHDAic77/+PGfGoZycnDAzWVBNtxJTY0qrv7+48d/mCUs6JJ89XsYpJ1VyTb8up08AwMDA4MsP///xx8/MjKhK6DE8Kd7b2OIseByAbUAC3LEUCuS1cTFsaciWNhRw5LHHz8yjmbSUTAKIAAAHrcgEXUU5YwAAAAASUVORK5CYII=';

const rectangleIcon = new Image();
rectangleIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVGNsqsmsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA0klEQVRIx2NgGAUEACM2we8/fvwnxzBODg4M81iwGe6kpkaWa7//+PEf3RIWbIbz1e9hkHZWJcnwp3tvMzipqWFYwoJNsbSzKsPTvbdJskDaWZXhUyOELcvP///xx4+MDAwMDEz4NL3beozh3dZjRPOxASZCLhPytkJho/MJASZiDSdXDROt8wHBOCAEKI4DmvpgNA6I8gGhjEYIsJASvoT4RFvwdO9tsgo7ouoDSorrfbduMaiJizMwMDAwwAo7qlY46IbjtABW5JJjCbLhwwMAAI5+ZZrvEYecAAAAAElFTkSuQmCC';

const fillIcon = new Image();
fillIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVI2ohW08AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABpElEQVRIx82VMUtCURiGH0PQlhxFwusSBxyCwKGMKLiELc5uIQ0FDtFWUzQb1B/oB0Q2NCfq4OQ/EE4tInFxKGlKabgNcS733vQeFaPOdM65l+f9vu+83znw38bHYGB/DAb2pP+Hp4WbQjjzxWg0NNfIs4Zh3x+s2d3bdTtrGBNlsjCLWKs6pFJOYAqBTmQmgev6m2edjMXsuQr8inNU/bOG4TmDZCxmB2UwlYteF1cp5gGkZ7/7/h6auUTKmsX8DgBbx+cA3DzWMIVA9nqzu2gUvH1ZcL4rkSAnhSeBP2TOudr83t/IRWhVh6TXfoqMarxQEHzpogZAadliJZUA4LljAThrtVc+2qchJX4R7RmUlq0fYD880z8d23haAT9MCbnh/uG2bWhcedLNDu3tlFNnN1iNTP+UVnXIRi5C4cyiISUiHvdYV5tBQ0oO93Y9mQB83p1o4VqBdLODKYQj4oYrRwXBp+rkhpSYQlApJyAXAdDCtQIv9SdnLuJxZK+HenCUaBBce7mNutDUkznJRTe20RRIRe6P0A2dKvJRftZF+OfjCySNE5ddU05FAAAAAElFTkSuQmCC';

const eraseIcon = new Image();
eraseIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVLhSQJ/IAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABK0lEQVRIx2NgGAUEACMxir7/+PEfXYyTg4MovSzEGO6kpkbQUlwWshBj+EwDNQZpNWm4+NNbTxnQLf3+48d/bJawEONNZMNh/C1oYk5qalgtYSLG9YTA01tP4WxZfv7/RFmAy/WkAiZqup5oC0h1/ek7z4i3gBzXz/nyhWHfrVsMauLixCdT7t4Ohg9Q9pO7Txh09qwnyvWPP35kxGkBzPUdsyahaJJRlmH4oJyLInZw53YGk1tP8boeZxzIKMvgDZond58wMDAwMJxxs8freqKSKTZw985lBgYGBobZXbPxuh5nHMBciM1H6HL4XE90UYFsKCmux7CAk4ODEVvpiR7pxLoeqw9glqAXZOiAGNfjrXCQC61bL19iyMMMx+d6oms0bKUkMYYPDwAArdGaa9wnQ0IAAAAASUVORK5CYII=';

const saveIcon = new Image();
saveIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQVN3D7jzIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAA4ElEQVRIx2NgGAUDDRhxSXz/8eM/KQZxcnBgNYsFl+FOamokufT7jx//sVnCgstwC6dMBgl1RQZ1Q0kGFXlJrIbeefic4eb55wwvbt5ncFJTw2oJEy4XSagrMjAwMOA0PNXdBUMtAwMDgyw//3+iLKAWIGjBnYfPsYqXz1pMlAUshBTcPA8JZ5r5gFJA0Acvbt7HK48cwWRZgM8QQpYTbQExBg1fHzARMvTEvukMEuqKWPGJfdMJOoCRWoXdvlu3GNTExRkYGBgYHn/8yEj14hqb4XgtwFZwEQLoho8CogAAz0BbPsc/fBQAAAAASUVORK5CYII=';

const reloadIcon = new Image();
reloadIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWA3piKEQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABe0lEQVRIx9VVq7KDMBDdzCBARVbcwaaytpoavoUf4Bv6A/0WDGgsklgGUYkqjorOMpvthuSaO3PXpSTn7OPsKcB/DxVz6bWuG/8tS9Oot0kMaGGM9zsS8fMhwWtdNwr6uP/A+ZLv53GYdlIEpmdKonzgHFSKcZigqmcniVvZQ2ftXkkigbfNVQThFZ0vObTNB5Qnk2u9TcuikiPwW9kDAEBnrfP40455J6JvooaMWSOwOZ2c7/b5hMIYqOoZ2iaPU1GWpooOt7PWAZ6WRfkqjZYpktCsEViqkvd9HKbwoklLxfXNZUyDVu4MOfSQ6ptWyoNXnsTqvzDmiyTXeqOD5/MSVSSB096ivqXBI1GWpmEvknaBy5XaBFbOKw0StM0VbmUPhTG0DY7/SJL92mQpc7qp1OB8Jog+RCv1bjIAQFXP8LiD4zuhzecqUj6Zok3gWbJsaoIS+OGi4WXsu7Qf1AR9my/aAOobL+dab1TnHFTS/6/+kzlxCPRP4w3A6io0yt+JDgAAAABJRU5ErkJggg==';

const undoIcon = new Image();
undoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWHYBtFScAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABKUlEQVRIx+1Uq7LCMBA97URwMchiro2s7AdUFF3db0H1W9DVRfABlZWx14DEAK6Ym50lbJqAwXBmOtNNZs7Zx9kAX3waie/iertNAPCzWCQ8dmHvfVA+8lLrByEbhxIJCljyZbtGXeREbGMXPBFJJPWVxsl85ADQ9BWW7Rql1mIbVWhITV/R/26zf7izwnWRo2tBIrySNNYN3TACAA7G0HfZHumcV/i7Wk0vC9RFjqavqOc6y0hkDmko49BZCErytXXSDs/ZHYyBzrL3BbiIdGfJ/87nBMD0loBbCc/enE42pH2Za5+aeypKrcmm3TA+bTPfj8v2KLZPveIi9HmUIf7bF98i3yZ3w0g29Q0/CWXuzkFylTD8eIG5p5oTS+TRAu76u5CIv4jGHaoeqH4byFz/AAAAAElFTkSuQmCC';

const redoIcon = new Image();
redoIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AcxV9bpUUqgmYo4pChdbIgKuIoVSyChdJWaNXB5NIvaGJIUlwcBdeCgx+LVQcXZ10dXAVB8APEydFJ0UVK/F9SaBHjwXE/3t173L0D/M0aU82ecUDVLCOTTIj5wooYfEUIEQgYRExipp7KLuTgOb7u4ePrXZxneZ/7c/QrRZMBPpF4lumGRbxOPL1p6Zz3iQVWkRTic+Ixgy5I/Mh12eU3zmWH/TxTMHKZOWKBWCx3sdzFrGKoxFPEUUXVKN+fd1nhvMVZrdVZ+578heGitpzlOs0RJLGIFNIQIaOOKmqwEKdVI8VEhvYTHv5hx58ml0yuKhg55rEBFZLjB/+D392apckJNymcAHpfbPsjBgR3gVbDtr+Pbbt1AgSegSut499oAjOfpDc6WvQIGNgGLq47mrwHXO4AkSddMiRHCtD0l0rA+xl9UwEYugX6Vt3e2vs4fQBy1NXSDXBwCIyWKXvN492h7t7+PdPu7weVs3K1THf6MgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+QIGBQWJahvrbkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABIklEQVRIx+1VqxaCQBC96yGAhYjFupHoBxDsZr/FxLeYyRQ/gEikWiRalIZBhzMsuzBosHDPIeze3TvPHYAF/4aSHHo2TWvbD3xfcZ7WHJ5EONFaxD+bpjWNeGPidPGY7wd8VpTgPK1NI6sx8XW6sYoDwGEXY51uemvCNgxbZwRcnC5lRYnH6dY7d8z3bz6PR+u3chGm+KWquo/2JfCmDpC4jiJUdY1Ea2faZkUwBpv3roi8OcKB7yuq0Rm3AU+Rfm2AG7FxJH6939Wkgawou1ZMtEZV1wDQCfPHxz3n4lYDPA3IYxx2MbJ0+Jp5G5MDs0cFRSHpd3pgZgRKMiq4t6YDvI1tKVK/DLup/IvG9TYM20+BIe2c2f8Dc4CZcIkvEOEFIdSyhtt+PqwAAAAASUVORK5CYII=';

import { Layers, Tools } from './constants';

class WindowCycloneMapEditorCommands extends Window_Command {
  initialize() {
    const x = Graphics.width - CycloneMapEditor.windowWidth;
    const y = 0;
    const w = CycloneMapEditor.windowWidth;
    const h = (CycloneMapEditor.tileDrawWidth >= 48 && Graphics.width >= 1280) ? 74 : 50;
    super.initialize(new Rectangle(x, y, w, h));
    this.showBackgroundDimmer();
    this.configureHandlers();
  }

  configureHandlers() {
    this.setHandler('undo', () => {
      CycloneMapEditor.undoButton();
      this.activate();
    });
    this.setHandler('redo', () => {
      CycloneMapEditor.redoButton();
      this.activate();
    });
    this.setHandler('pencil', () => {
      CycloneMapEditor.pencilButton();
      this.activate();
    });
    this.setHandler('rectangle', () => {
      CycloneMapEditor.rectangleButton();
      this.activate();
    });
    this.setHandler('fill', () => {
      CycloneMapEditor.fillButton();
      this.activate();
    });
    this.setHandler('eraser', () => {
      CycloneMapEditor.eraserButton();
      this.activate();
    });
    this.setHandler('save', () => {
      CycloneMapEditor.saveButton();
      this.activate();
    });
    this.setHandler('reload', () => {
      CycloneMapEditor.reloadButton();
      this.activate();
    });
  }

  maxScrollY() {
    return 0;
  }

  maxScrollX() {
    return 0;
  }

  processCursorMove() {
  }

  processHandling() {
  }

  updateBackOpacity() {
    this.backOpacity = 255;
  }

  _updateCursor() {
    this._cursorSprite.visible = false;
  }

  makeCommandList() {
    this.addCommand('Undo', 'undo');
    this.addCommand('Redo', 'redo');

    this.addCommand('', '');

    this.addCommand('Pen', 'pencil');
    this.addCommand('Rect', 'rectangle');
    this.addCommand('Fill', 'fill');
    this.addCommand('Erase', 'eraser');
  }

  colSpacing() {
    return 6;
  }

  rowSpacing() {
    return 0;
  }

  maxCols() {
    return 7;
  }

  redraw() {
    Window_Selectable.prototype.refresh.call(this);
  }

  getSymbolIcon(symbol) {
    switch(symbol) {
      case 'undo':
        return undoIcon;
      case 'redo':
        return redoIcon;
      case Tools.pencil:
        return pencilIcon;
      case Tools.rectangle:
        return rectangleIcon;
      case Tools.fill:
        return fillIcon;
      case Tools.eraser:
        return eraseIcon;
      case 'save':
        return saveIcon;
      case 'reload':
        return reloadIcon;
    }
  }

  itemRect(index) {
    const rect = super.itemRect(index);

    if (Graphics.width < 1280) {
      rect.width += 3;
    }

    return rect;
  }

  lineHeight() {
    if (Graphics.width >= 1280) {
      if (CycloneMapEditor.tileDrawWidth < 48) {
        return 14;
      }

      return 36;
    }

    return 14;
  }

  drawItem(index) {
    const symbol = this.commandSymbol(index);
    const rect = this.itemRect(index);

    if (CycloneMapEditor.changingTileProps && ['undo', 'redo'].includes(symbol)) {
      return;
    }

    if (CycloneMapEditor.currentLayer === Layers.blend) {
      if (symbol === Tools.fill) {
        return;
      }
    } else if (CycloneMapEditor.puzzleMode) {
      if ([Tools.rectangle, Tools.fill].includes(symbol)) {
        return;
      }
    }

    if (symbol === CycloneMapEditor.currentTool) {
      this.contents.fillRect(rect.x, rect.y + 2, rect.width, rect.height, '#00FF0066');

      this.contents.fillRect(rect.x -2, rect.y, rect.width + 4, 4, '#000000');
      this.contents.fillRect(rect.x -2, rect.y + 2 + rect.height, rect.width + 6, 4, '#000000');
      this.contents.fillRect(rect.x - 2, rect.y, 4, rect.height + 4, '#000000');
      this.contents.fillRect(rect.x + rect.width, rect.y, 4, rect.height + 4, '#000000');

      this.contents.fillRect(rect.x, rect.y + 2, rect.width, 2, '#FFFFFF');
      this.contents.fillRect(rect.x, rect.y + 2 + rect.height, rect.width + 2, 2, '#FFFFFF');
      this.contents.fillRect(rect.x, rect.y + 2, 2, rect.height, '#FFFFFF');
      this.contents.fillRect(rect.x + rect.width, rect.y + 2, 2, rect.height, '#FFFFFF');
    }

    const icon = this.getSymbolIcon(symbol);

    if (!icon) {
      return super.drawItem(index);
    }

    this.resetTextColor();
    if (symbol === 'undo') {
      this.changePaintOpacity(CycloneMapEditor.changeHistory.length > 0);
    } else if (symbol === 'redo') {
      this.changePaintOpacity(CycloneMapEditor.undoHistory.length > 0);
    } else {
      this.changePaintOpacity(true);
    }

    const ctx = this.contents._canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const iconWidth = (CycloneMapEditor.tileDrawWidth >= 48 && Graphics.width >= 1280) ? 48 : 24;
    ctx.drawImage(icon, rect.x + 1, rect.y, iconWidth, iconWidth);
  }

  drawAllItems() {
    super.drawAllItems();
  }

  playCursorSound() {
  }

  playOkSound() {
  }

  playBuzzerSound() {
  }
}

export {
  WindowCycloneMapEditorCommands,
};