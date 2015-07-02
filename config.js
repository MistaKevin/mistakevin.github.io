Backbone.Layout.configure({
  // Set the prefix to where your templates live on the server, but keep in
  // mind that this prefix needs to match what your production paths will be.
  // Typically those are relative.  So we'll add the leading `/` in `fetch`.
  prefix: "templates/",

  // This method will check for prebuilt templates first and fall back to
  // loading in via AJAX.
  fetchTemplate: function(path) {
    // Check for a global JST object.  When you build your templates for
    // production, ensure they are all attached here.
    var JST = window.JST || {};

    // If the path exists in the object, use it instead of fetching remotely.
    if (JST[path]) {
      return JST[path];
    }

    // If it does not exist in the JST object, mark this function as
    // asynchronous.
    var done = this.async();

    // Fetch via jQuery's GET.  The third argument specifies the dataType.
    $.get(path, function(contents) {
      // Assuming you're using underscore templates, the compile step here is
      // `_.template`.
      done(_.template(contents));
    }, "text");
  }
});