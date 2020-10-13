const omitDeep = require("../lib/index");

describe(".omitDeep()", () => {
  it("should recursively omit key passed as a string.", () => {
    const o = omitDeep({a: "a", b: "b", c: {b: "b", d: "d", e: {b: "b", f: "f", g: {b: "b", c: "c"}}}}, "b");
    expect(o).to.deep.equal({a: "a", c: {d: "d", e: {f: "f", g: {c: "c"}}}});
  });

  it("should recursively omit key passed as an array.", () => {
    const o = omitDeep({a: "a", b: "b", c: {b: "b", d: "d", e: {b: "b", f: "f", g: {b: "b", c: "c"}}}}, ["b"]);
    expect(o).to.deep.equal({a: "a", c: {d: "d", e: {f: "f", g: {c: "c"}}}});
  });

  it("should recursively omit multiple keys.", () => {
    const o = omitDeep({
      a: "a",
      b: "b",
      c: {b: "b", d: "d", e: {b: "b", f: "f", g: {b: "b", c: "c"}}}
    }, ["b", "d", "f"]);
    expect(o).to.deep.equal({a: "a", c: {e: {g: {c: "c"}}}});
  });

  it("should recursively omit multiple keys, by listing them as arguments", () => {
    const o = omitDeep({
      a: "a",
      b: "b",
      c: {b: "b", d: "d", e: {b: "b", f: "f", g: {b: "b", c: "c"}}}
    }, "b", "d", "f");
    expect(o).to.deep.equal({a: "a", c: {e: {g: {c: "c"}}}});
  });

  it("should omit the given keys.", () => {
    const o = omitDeep({a: "a", b: "b", c: "c"}, ["a", "c"]);
    expect(o).to.deep.equal({b: "b"});
  });

  it("should return the object if no keys are specified.", () => {
    const o = omitDeep({a: "a", b: "b", c: "c"});
    expect(o).to.deep.equal({a: "a", b: "b", c: "c"});
  });

  it("should return an empty object if no object is specified.", () => {
    const o = omitDeep(undefined);
    expect(o).to.be.undefined;
  });

  it("should return the input unchanged if not an array or an object", () => {
    const o = omitDeep("foo");
    expect(o).to.equal("foo");
  });

  it("should omit keys from objects in arrays", () => {
    const o = omitDeep([
      {a: "a", b: "b"},
      [
        {a: "a", b: "b"}
      ]
    ], "b");

    expect(o).to.deep.equal([
      {a: "a"},
      [
        {a: "a"}
      ]
    ]);
  });

  it("should preserve arrays when not omitting objects from them", () => {
    const o = omitDeep({
      "numbers": ["1", "2"]
    }, "nothing");

    expect(o).to.deep.equal({
      "numbers": ["1", "2"]
    });
  });

  describe("timestamp objects", () => {
    it("should not remove any of the timestamp objects", () => {
      const o = omitDeep({
        "created_at": "2017-08-24T13:04:58.558Z",
        "updated_at": "2017-08-24T13:04:58.525Z"
      }, {});

      expect(o).to.deep.equal({
        "created_at": "2017-08-24T13:04:58.558Z",
        "updated_at": "2017-08-24T13:04:58.525Z"
      });
    });

    it("should remove one of the timestamp objects", () => {
      const o = omitDeep({
        "created_at": "2017-08-24T13:04:58.558Z",
        "updated_at": "2017-08-24T13:04:58.525Z"
      }, "created_at");

      expect(o).to.deep.equal({
        "updated_at": "2017-08-24T13:04:58.525Z"
      });
    });

    it("should remove all timestamp objects", () => {
      const o = omitDeep({
        "created_at": "2017-08-24T13:04:58.558Z",
        "updated_at": "2017-08-24T13:04:58.525Z"
      }, [
        "created_at",
        "updated_at"
      ]);

      expect(o).to.deep.equal({});
    });
  });

  it("should preserve undefined values", () => {
    const o = omitDeep({
      "foo": undefined
    }, "bar");

    expect(o).to.deep.equal({
      "foo": undefined
    });
  });

  it("should not mutate its inputs", () => {
    const b = {"c": 1, "o": 1};
    const original = {"a": 1, "b": b, "o": 1};

    const omitted = omitDeep(original, "o");
    expect(omitted).to.deep.equal({
      "a": 1,
      "b": {
        "c": 1,
      },
    });
    expect(original).to.deep.equal({
      "a": 1,
      "o": 1,
      "b": {
        "c": 1,
        "o": 1,
      },
    });
    expect(omitted).to.not.equal(original);
    expect(omitted.b).to.not.equal(b);
  });
});
