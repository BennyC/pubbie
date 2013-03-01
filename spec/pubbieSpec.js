describe('Pubbie', function () {
    it('should exist and uid/callbacks should not public', function () {
        expect(pubbie).toBeDefined();
    });

    describe('issuing subscriptions', function () {
        afterEach(function () {
            // Clean out pubbie before each run.
            pubbie.reset();
        });

        it('should be able to handle subscriptions and return tokens', function () {
            var token = pubbie.subscribe('message', function () {
                return true;
            });

            expect(token).toEqual(jasmine.any(Number));
        });

        it('should be able to handle multiple subscriptions to the same namespace', function () {
            var token, i,
                fn = function () { return true; };

            for (i = 0; i < 2; i += 1) {
                token = pubbie.subscribe('message', fn);
            }

            expect(token).toEqual(jasmine.any(Number));
        });

        it('should be able to handle multiple subscriptions to multiple namespaces', function () {
            var token, i,
                namespaces = ['foo', 'bar'],
                fn = function () { return true; };

            namespaces.forEach(function () {
                for (i = 0; i < 2; i += 1) {
                    token = pubbie.subscribe(this, fn);
                }
            });

            expect(token).toEqual(jasmine.any(Number));
        });
    });

    describe('publishing to subscriptions', function () {
        afterEach(function () {
            // Clean out pubbie before each run.
            pubbie.reset();
        });

        it('should run functions specified by the subscription', function () {
            var counter = 0,
                fn = function () {
                    counter += 1;
                };

            pubbie.subscribe('increment', fn);
            pubbie.publish('increment');
            expect(counter).toEqual(1);
        });

        it('should run all functions specified by the subscription', function () {
            var counter = 0,
                fn = function () {
                    counter += 1;
                };

            pubbie.subscribe('increment', fn);
            pubbie.subscribe('increment', fn);
            pubbie.publish('increment');

            // Should equal 2 as there is 2 subscriptions to increment counter by 1.
            expect(counter).toEqual(2);
        });
    });

    describe('unsubscribing', function () {
        it('should be able to use namespace to unset all subscribers', function () {
            var i, count = 0;
                fn = function () {
                    count += 1;
                };

            for (i = 0; i < 5; i += 1) {
                pubbie.subscribe('increment', fn);
            }

            pubbie.unsubscribe('increment');
            pubbie.publish('increment');

            // Count will remain at 0, as non of the incrementers were ran before
            // being unsubscribed.
            expect(count).toEqual(0);
        });

        it('should be able to use a particular token to unsubscribe a certain subscription', function () {
            var i,
                token,
                count = 0,
                fn = function () {
                    count += 1;
                };

                for (i = 0; i < 2; i += 1) {
                    token = pubbie.subscribe('increment', fn);
                }

                pubbie.unsubscribe(token);
                pubbie.publish('increment');

                // Because we only removed one subscription, the number will increment by 1.
                expect(count).toEqual(1);
        });
    });

});
