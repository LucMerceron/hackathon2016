var StringFormat = {
  StringMaxSize30: function(str){  
    return str.length < 30 ? true : false;
  },
  StringMinSize1: function(str){
    return str.length > 0 ? true : false;
  },
  StringMinSize2: function(str){
    return str.length > 1 ? true : false;
  },
  StringMaxSize4: function(str){  
    return str.length < 4 ? true : false;
  },
  StringMaxSize5: function(str){  
    return str.length < 5 ? true : false;
  },
};

module.exports = StringFormat;