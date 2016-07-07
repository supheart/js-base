require('./Detector');
var containerDetector = new ContainerDetector('#abc #def #ghi');
var linkDetector = new LinkDetector('http://supherat.com');

containerDetector.detect();
linkDetector.detect();