namespace TeamOrange.Tests
{
    public class UnitTest1
    {
        [Fact]
        public void Test1()
        {
            // Arrange
            var expected = 5;

            // Act
            var actual = 5;

            // Assert
            Assert.Equal(expected, actual);
        }
    }
}