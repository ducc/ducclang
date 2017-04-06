const input = "[51,[7,[5,1,2,8,3]],>[0,13,94,],[1],],";
//const input = "[[\"standard.ducc\", std],0,>[std[1]>[\"bark\"],[1]=[1]+1],],";

const Container = function() {
    this.items = [];
    this.function = false;
};

Container.prototype.push = function(item) {
    this.items.push(item);
};

Container.prototype.toString = function() {
    return this.items.toString();
};

function compile(input) {
    input = input.substring(1, input.lastIndexOf("]"));
    let container = new Container();
    let temp = "";
    for (let i = 0; i < input.length; i++) {
        let c = input[i];
        switch (c) {
            case ">":
                i++;
                container.function = true;
            case "[": {
                const start = i;
                for (; i < input.length; i++) {
                    let c2 = input[i];
                    if (c2 == ']') {
                        i++;
                        break;
                    }
                }
                container.push(compile(input.substring(start, i+2)));
                break;
            }
            case ",": {
                container.push(temp);
                temp = "";
                break;
            }
            default: {
                temp += c;
                break
            }
        }
    }
    if (temp.length > 0) {
        container.push(temp);
    }
    return container;
}

const c = compile(input);
console.log(c.items.join(","));