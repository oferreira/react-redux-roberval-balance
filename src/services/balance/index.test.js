import BalanceService from '../balance';

describe('compute function', function () {
    const weight = 100;
    const heavierItemIndex = 4;

    beforeEach(() => {
        this.items = Array.from(Array(8).keys()).map(index => ({
            index,
            weight: index == heavierItemIndex ? Math.floor(weight * 1.1) : weight
        }));
    });

    it('should find the correct item', () => {
        BalanceService.findHeaviestItem((result) => {
            expect(result.item.index).toEqual(heavierItemIndex, 'Item found should be the heavier item choosen');
        }, (e) => expect(e).toBeFalsy(), this.items)

    });

    it('should take less than 3 rounds', () => {
        BalanceService.findHeaviestItem((result) => {
            expect(result.round).toBeLessThan(3)
        }, (e) => expect(e).toBeFalsy(), this.items)
    });
});
